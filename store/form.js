import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  sections: [],
  formValues: {}
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    saveSection: (state, action) => {
      if (!state.sections.find(x => x.name === action.payload.section.name)) {
        state.sections.push({
          name: action.payload.section.name,
          status: 'Not Started',
          slug: action.payload.section.slug
        });
      } else {
        state.sections.find(x => x.name === action.payload.section.name).status = 'In Progress';
      }

      if (action.payload.formValues) {
        for (const [key, value] of Object.entries(action.payload.formValues)) {
          state.formValues[key] = value;
        }
      }
    },
    submitSection: (state, action) => {
      state.sections.find(x => x.name === action.payload.section.name).status = 'Submitted';
      // send data to the server...
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  saveSection,
  submitSection
} = formSlice.actions;

export default formSlice.reducer;
