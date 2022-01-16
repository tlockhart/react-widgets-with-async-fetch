import React, {useState} from "react";
import {Accordion} from "./components/Accordion";
import Counter from "./components/Counter";
import Search from "./components/Search";
import DebounceSearch from "./components/DebounceSearch";
import Dropdown from "./components/Dropdown";

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
];

const items = [
    {
        title: "What is React?",
        content: "React is a front end javascript framework",
    },
    {
        title: "Why use React?",
        content: "React is a favoite JS library among engineers",
    },
    {
        title: "How do you use React?",
        content: "You use react by creating components",
    },
];

export function App() {
    const [selected, setSelected] = useState(options[0]);
    const [showDropdown, setShowDropdown] = useState(true);

    const setSelectedOption = (data) => {
        setSelected(data);
        console.log(data);
    }
    return (
        <div>
            {/* <Accordion items={items}/>
      <Counter /> */}
            {/* <DebounceSearch /> */}
            <button onClick={() => setShowDropdown(!showDropdown)}>ToggleDropdown</button>
            {showDropdown ?
                <Dropdown
                    selected={selected}
                    onSelectedChange={setSelected}
                    options={options}
                /> : null}
        </div>
    );
}
