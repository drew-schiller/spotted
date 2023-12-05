import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CallbackPage.module.sass';

type Props = {};

const CallbackPage: React.FC = (props: Props) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const url = document.location.href;
        if (url) {
            const code = new URL(url).searchParams.get("code");
            if (!code) navigate("/");
        }
    });

    return (
        <div className={styles.page}>
            <p>Redirecting...</p>
        </div>
    );
};

export default CallbackPage;