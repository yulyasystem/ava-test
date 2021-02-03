export const initialFilterValues = {
  films: [
    { id: 0, value: "A New Hope", isChecked: false },
    { id: 1, value: "The Empire Strikes Back", isChecked: false },
    { id: 2, value: "Return of the Jedi", isChecked: false },
    { id: 3, value: "The Phantom Menace", isChecked: false },
  ],
  species: [
    { id: 4, value: "Droid", isChecked: false },
    { id: 5, value: "Sullustan", isChecked: false },
    { id: 6, value: "Human", isChecked: false },
  ],
  age: { label: "Age", min: -80, max: 100, step: 1, value: { min: -80, max: 100 } },
};
