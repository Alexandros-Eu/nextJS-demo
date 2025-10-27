import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList.js';

export default function HomePage(props)
{
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a list of highly active React meetups!"/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}

// export async function getServerSideProps(context)
// {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps()
{
    // fetch data from an API
    const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogfqnmc.mongodb.net/?appName=Cluster0`);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => {
                return {
                    title: meetup.title,
                    image: meetup.image,
                    address: meetup.address,
                    id: meetup._id.toString()
                }
            })
        },
        revalidate: 10
    }
}