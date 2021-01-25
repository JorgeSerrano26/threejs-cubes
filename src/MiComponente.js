import React, { useEffect, useState } from 'react';

const MiComponente = ({ }) => {
    const [contardor, setContador] = useState(0);

    const sumar = () => {
        setContador(contardor + 1);
    }

    useEffect( () => {
        console.log("me renderice");
    }, [contardor])

    return <div>
        {contardor}
        <button onClick={sumar}>Sumar</button>
    </div>
}

export default MiComponente;