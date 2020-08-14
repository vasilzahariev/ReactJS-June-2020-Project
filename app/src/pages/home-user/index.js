import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Title from '../../components/title';
import UserContext from '../../UserContext';
import styles from './index.module.css';
import HomeUserRenderer from '../../components/home-user-renderer';

const HomeUser = () => {
    const context = useContext(UserContext);

    const [activities, setActivities] = useState([]);
    const [ended, setEnded] = useState(false);

    const getData = async () => {
        const userId = context.user._id;

        const promise = await fetch(`http://localhost:9999/getUserActivity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId
            })
        });

        const response = await promise.json();

        setActivities(response.reverse());
        setEnded(true);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Layout>
            {!ended ? <p>Reciving mission summary</p> : <HomeUserRenderer activities={activities} />}
        </Layout>
    )
}

export default HomeUser;


/*
<Grid container direction="row" justify="space-evenly" alignItems="center">
                <Grid item xs={4}>
                    <Title>Hello there, <span className={styles.epicGamer}>{context.user.username}</span>!</Title>
                </Grid>
                <Grid item xs={4}>
                    {(ended && activities.length === 0) ? <p>No games! :(</p> : <ActivitiesRenderer activities={activities} />}
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
*/