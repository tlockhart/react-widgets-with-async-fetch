import React, {useState, useEffect, useRef} from 'react';

const Dropdown = ({options, selected, onSelectedChange}) => {   const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
            // Ref.current.contains sees if the element
            // clicked on is inside our component.
            // If it is inside then return early
            if(ref.current.contains(event.target)){
                return;
            }
            setOpen(false);
        }, {capture: true});
    }, []);

    const renderedOptions = options.map((option, index) => {

        if (option.value === selected.value) {
            return null;
        }
        return (
            <div 
            key={index} 
            className="item"
            onClick={()=> onSelectedChange(option)}>
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">Select a Color</label>
                <div onClick={() => setOpen(!open)}className={`ui selection dropdown ${open ? 'visible active': ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;