export default function Home() {
    return (
        <div className= { styles.container } >
            <section>
                <h1>Strava</h1>
                <p>
                    In 2022, I completed my first ever half-marathon in 2:44.
                    This year, In 2023, I am hoping to complete a full-marathon in October!
                    My first group run of the season is a second half-marathon in May. Followed by a 10 km run the next week.
                    This is my training so far:
                </p>
                <iframe height='454' width='300' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/athletes/37540239/latest-rides/8ba3466fcca0a706736225da6ef2c0b2d79fe554'></iframe>
            </section>
        </div>
    );
}