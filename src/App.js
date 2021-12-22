import React from "react";
import {Accordion} from "./components/Accordion";
import Counter from "./components/Counter";
import Search from './components/Search';
import DebounceSearch from './components/DebounceSearch';

const items = [
    {
        title: 'What is React?',
        content: 'React is a front end javascript framework',
    },
    {
        title: 'Why use React?',
        content: 'React is a favoite JS library among engineers',
    },
    {
        title: 'How do you use React?',
        content: 'You use react by creating components',
    }
];

export function App(){
  return (
    <div>
      {/* <Accordion items={items}/>
      <Counter /> */}
      {/* <Search /> */}
      <DebounceSearch />
    </div>
  );
}
