import React from 'react';

// Preload all components from components directory and subdirectories
const componentMap = {};

const importAllComponents = (requireContext) => {
  requireContext.keys().forEach((path) => {
    const componentName = path
      .split('/')
      .pop()
      .replace(/\.[jt]sx?$/, ''); // Remove file extension
    componentMap[componentName] = requireContext(path).default;
  });
};

// Dynamically load all components in components/ and subdirectories
importAllComponents(require.context('../../components', true, /\.[jt]sx?$/));

export const formPageComponentRenderer = async ({ 
  children,
  formData,
  handleChange,
  handleSave,
  handleSubmit
}) => {
  const renderComponent = async (node, index) => {
    // If no component is specified, return null
    if (!node.component) return null;

    // Find and resolve the component
    const Component = componentMap[node.component];
    if (!Component) {
      console.error(`Component not found: ${node.component}`);
      return <div key={`error-${index}`}>Component not found: {node.component}</div>;
    }

    // Recursively render children
    const renderedChildren = node.children
      ? await Promise.all(node.children.map(renderComponent))
      : null;
    
    // Assign a unique key using the index or the node's properties
    const uniqueKey = node.key || `${node.component}-${index}`;

    // Render the component, passing props and children
    return (
      <Component
        key={uniqueKey}
        {...node.data}
        value={formData[node.data?.label || node.component] || ""}
        onChange={(e) => {
          console.log(e)
          handleChange(node.data?.label || node.component, e.target.value)
        }}
        onSave={() => handleSave()}
        onSubmit={() => handleSubmit()}
      >
        {renderedChildren}
      </Component>
    );
  };

  // Render all top-level children
  return await Promise.all(children.map((child, index) => renderComponent(child, index)));
};
