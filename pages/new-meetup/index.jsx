import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm.js';

export default function NewMeetupPage()
{
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData)
    {
        const res = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resData = await res.json();
        console.log(resData);

        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>New Meetup</title>
                <meta description="A new meetup" content="Add your own meetups and create amazing networking opportunities."/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    )
}