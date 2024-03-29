/* tslint:disable no-empty*/
import React from "react";

/* We explain how the data looks, and how to handle changes, used for test purposes */
const SearchContext = React.createContext({
  location: "Seatle, WA",
  animal: "",
  breed: "",
  breeds: [] as string[],
  handleAnimalChange(event: React.ChangeEvent<HTMLSelectElement>) {},
  handleBreedChange(event: React.ChangeEvent<HTMLSelectElement>) {},
  handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {},
  getBreeds() {}
});

// SearchContext creates a Provider (entry point) and Consumer (exit point)
export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
