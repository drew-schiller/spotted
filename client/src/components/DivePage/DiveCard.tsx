import React, { useEffect, useState } from 'react';
import styles from './DivePage.module.sass';

type Props = { id: string, name: string, color: string };

const DiveCard: React.FC<Props> = (props: Props) => {
    const [name, setName] = useState(props.name);
    const [color, setColor] = useState(props.color);
    const [track, setTrack] = useState({id: "", name: "", preview_url: "", images: []});

    return (
        <div className={styles.diveCard} style={{backgroundColor: color}}>
            {name}
        </div>
        
    );
};

export default DiveCard;