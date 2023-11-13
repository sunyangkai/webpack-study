import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'src/reducer';


import { reactHomeActions } from 'src/pages/react/reducer';

export const JavascriptHome = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        console.log(props)
        console.log(location)
    }, [])

    const handleAction = () => {
        dispatch(reactHomeActions.increment());
      };
    return (
        <div>
            javascript
            <button onClick={handleAction}>增加</button>
        </div>
    )
}

