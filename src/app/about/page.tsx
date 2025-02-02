import React from 'react';
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '800']
});

const AboutPage = () => {
    return (
        <div className={`about-page m-10 ${jetbrains.className}`}>
            <h2 className="text-5xl ">why should you mass-follow on bsky?</h2>

            following currently is a default quasi-'starter pack'. 

            on bsky, following does NOT sufficiently augment user experience. unlike twitter, atproto provides: moderation through labels, discovery through custom feeds and starter packs, and a generous API rate limit.

<br></br>
            following can suggest a social network.
            <br></br>

            the following-to-follower ratio DOES influence brand identity. but for the majority of users, follower count does not add value to the user experience.
            <br></br>

            <br></br>

the ratio of followers to following matters more than the actual numbers or who you are following

            <p className="">connect, dont just broadcast. releasing your trash onto the world won't get you far.</p>

so: 

build reciprocity. 
thrive on give-and-take. 
increase the likelihood they continue to engage with your content and share it within their circles. Over time, this can lead to organic growth and a more engaged community.
more connections are valued than less connections.
when your account is big, you can revoke the app password you gave this site and unfollow everyone. 
        </div>
    );
};

export default AboutPage; 