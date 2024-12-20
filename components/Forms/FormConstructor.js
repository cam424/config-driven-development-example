import React from "react";
import FormActionNavbar from "components/Navbars/FormActionNavbar"


export default function FormConstructor({ children, onSave, onSubmit }) {
  return (
    <div className="w-full lg:w-8/12 px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-1">
        <div className="flex-auto px-4 lg:px-10 py-10 pt-4">
          {children}
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <FormActionNavbar onSave={onSave} onSubmit={onSubmit}/>
        </div>
      </div>
    </div>
  )
}