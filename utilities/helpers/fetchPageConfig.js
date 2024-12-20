export const fetchPageConfig = async (slug) => {
  if (!slug) return; // Wait for slug to be available
  try {
    // Dynamically import the JSON based on the slug
    const config = await import(`/utilities/pageConfigs/formPages/${slug}.json`);
    return config;
  } catch (error) {
    console.error("Error loading page config:", error);
    return null; // Handle errors (e.g., show a 404 page)
  }
};

export const loadAllConfigs = async () => {
  try {
    const response = await fetch("/api/fetchAllConfigs");
    const files = await response.json();

    const configs = await Promise.all(
      files.map(async (file) => {
        const config = await import(`../../utilities/pageConfigs/formPages/${file}`);
        const formConstructor = config.children.find(
          (child) => child.component === "FormConstructor"
        );
        
        if (!formConstructor || !formConstructor.data) {
          console.warn(`No FormConstructor data in config: ${file}`);
          return null;
        }
        
        return {
          name: formConstructor.data.section,
          status: 'Not Started',
          slug: config.title.replace(/\s+/g, "-").toLowerCase()
        };
      })
    );

    return configs;
  } catch (error) {
    console.error("Error loading configs:", error);
    return [];
  }
};
