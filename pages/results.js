import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Default from "layouts/Default.js";

import { loadAllConfigs } from "utilities/helpers/fetchPageConfig";
import { saveSection } from 'store/form';

import ResultsDashboard from "components/ResultsDashboard.js/ResultsDashboard";



export default function Results() {
  const forms = useSelector((state) => state.form.sections);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!Object.keys(forms).length) {
      const fetchConfigBlob = async () => {
        try {
          const forms = await loadAllConfigs();

          console.log(forms)

          forms.forEach((form) => {
            dispatch(saveSection({
              section: {
                name: form.name,
                status: 'Not Started',
                slug: form.slug
              }
            }))
          });

          // setForms(forms);
        } catch (error) {
          console.error('Error fetching forms sections:', error);
        }
      };

      fetchConfigBlob();
      return;
    }
  }, [forms, dispatch]);

  if (!forms) return <div>Loading data...</div>;

  return (
    <ResultsDashboard forms={forms} />
  );
}

Results.layout = Default;