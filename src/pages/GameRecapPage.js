// React
import React, { useEffect, useState } from "react";

// Components
import Button from "../components/Button.js";
import Modal from '../components/Modal.js';

// Database
import { ref, onValue } from "firebase/database";
import { database } from "../database.js";

//Redux
import { useSelector } from "react-redux";

// Styles
import styles from "../styles/EndPage.module.css";

// Images
import VotingCard from "../components/VotingCard";

export default function GameRecapPage() {
  const ablyUsers = useSelector((state) => state.session.ablyUsers);
  const gamePin = useSelector((state => state.session.gamePin));
  const round = useSelector((state) => state.session.round);

  const [objectArray, setObjectArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Create an array of promises
    const promises = [];
    let tempArray = [];
    for (let i = 1; i <= round; i++) {
      let currentRound = i;

      for (let i = 0; i < ablyUsers.length; i++) {
        //Responses
        const responseData = ref(
          database,
          `lobby-${gamePin}/responses/round-${currentRound}/${ablyUsers[i]}/response`
        );

        // Votes
        const voteData = ref(
          database,
          `lobby-${gamePin}/responses/round-${currentRound}/${ablyUsers[i]}/votes`
        );

        // Push promises for response and vote data into the promises array
        promises.push(
          new Promise((resolve) => {
            onValue(
              responseData,
              (snapshot) => {
                resolve(snapshot.val());
              },
              {
                onlyOnce: true,
              }
            );
          }),
          new Promise((resolve) => {
            onValue(
              voteData,
              (snapshot) => {
                resolve(snapshot.val());
              },
              {
                onlyOnce: true,
              }
            );
          }),
          new Promise((resolve) => {
            resolve(currentRound);
          })
        );
      }
    }

    // Wait for all promises to resolve
    Promise.all(promises)
      .then((data) => {
        // 'data' will contain an array of response and vote values

        for (let i = 0; i < data.length; i += 3) {
          const responseValue = data[i];
          const voteValue = data[i + 1];
          const roundValue = data[i + 2];

          tempArray.push({
            response: responseValue,
            votes: voteValue,
            round: roundValue,
          });
        }

        //sort temp array
        tempArray.sort((a, b) => {
          //sort by rounds
          if (a.round < b.round) return -1;
          if (a.round > b.round) return 1;
          //sort by votes
          if (b.votes < a.votes) return -1;
          if (b.votes < a.votes) return 1;

          return 0;
        });

        let topThreePromise = new Promise((resolve) => {
          const topThreeVotesByRound = {};

          // Iterate through the sorted tempArray and store the top three votes for each round
          tempArray.forEach((entry) => {
            const round = entry.round;
            if (!topThreeVotesByRound[round]) {
              topThreeVotesByRound[round] = [];
            }

            if (topThreeVotesByRound[round].length < 3) {
              topThreeVotesByRound[round].push(entry);
            }
          });
          tempArray = topThreeVotesByRound;
          resolve(tempArray);
        });

        topThreePromise.then((data) => {
          setObjectArray(tempArray);
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // eslint-disable-next-line
  }, []);

  console.log(objectArray);

  const handlePlayAagain = (url) => { 
    window.open(url, "_self");
    window.opener = null;
    window.close();    
  }
  
  /* RENDER */

  return (
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <Button
                name="PLAY AGAIN"
                static={false} //button width decreases as page height increases
                press={ () => { handlePlayAagain(`${window.location.origin.toString()}`) } }
            />
            <div className={styles.button_spacer}/>
               <Button
                   name="SHARE"
                   static={false}
                   press={ () => {
                       setOpenModal(true);
                   }}
               />
            {openModal && <Modal closeModal={ setOpenModal } />}
          </div>
          <div className={styles.container}>
            <div className={styles.subtitle}>SESSION FAVOURITES</div>
            <div className={styles.carousel_wrapper}>
              <VotingCard response="test response"/>
              <VotingCard response="test response"/>
              <VotingCard response="test response"/>
              <VotingCard response="test response"/>
              <VotingCard response="test response"/>
              <VotingCard response="test response"/>
            </div>
          </div>
        </div>
      </div>
  );
}