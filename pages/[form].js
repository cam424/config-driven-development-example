import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formPageComponentRenderer } from "utilities/helpers/formPageComponentRenderer";
import { fetchPageConfig } from "utilities/helpers/fetchPageConfig";
import { useSelector, useDispatch } from 'react-redux';
import { 
  saveSection,
  submitSection,
} from 'store/form';

// layout for page
import Form from "layouts/Form.js";

export default function FormPage() {
  const [pageConfig, setPageConfig] = useState(null);
  const [renderedContent, setRenderedContent] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const slug = router.query.form;
  const cachedFormData = useSelector((state) => state.form.formValues);

  useEffect(() => {
    const fetchAndSetConfig = async () => {
      if (!slug) return;
      try {
        const config = await fetchPageConfig(slug);
        setPageConfig(config);
      } catch (error) {
        console.error('Error fetching page config:', error);
        setPageConfig(null);
      }
    };
  
    fetchAndSetConfig();
  }, [slug, dispatch]);

  // Update formData dynamically
  const handleChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    dispatch(saveSection({
      section: {
        name: pageConfig.children[0].data.section,
        slug: router.asPath
      }, 
      formValues: formData
    }))
    router.push('/results')
  };
  
  const handleSubmit = () => {
    handleSave();
    dispatch(submitSection({
      section: {
        name: pageConfig.children[0].data.section
      }
    }))
    router.push('/results')
  };

  useEffect(() => {
    if (Object.keys(formData).length === 0) {
      setFormData(cachedFormData)
    }
  }, [cachedFormData]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pageConfig) return;
      // Dynamically render components
      const components = await formPageComponentRenderer({
        children: pageConfig.children,
        formData,
        handleChange,
        handleSave,
        handleSubmit
      });
      setRenderedContent(components);
    };

    renderPage();
  }, [pageConfig, formData]);

  if (!slug || !pageConfig) return <div>Loading configuration...</div>;

  return (
    <div className="flex content-center items-center justify-center h-full">
      {renderedContent || <span>Loading...</span>}
    </div>
  );
};

FormPage.layout = Form;
