// import jsonfile from 'jsonfile';
// import moment from 'moment';
// import simplegit from 'simple-git';

// const FILE_PATH = './data.json';

// const getRandomDateBetween = (start, end) => {
//     const startDate = moment(start);
//     const endDate = moment(end);
//     const randomDate = moment(startDate).add(Math.random() * (endDate - startDate), 'milliseconds');
//     return randomDate.format();
// }

// const startDate = '2025-01-01'; // Start date
// const endDate = '2025-12-20'; // End date

// const makecommit = n => {

//     if (n === 0) return simplegit().push();

//     const DATE = getRandomDateBetween(startDate, endDate);

//     const data = {
//         date: DATE
//     }

//     console.log(DATE);

//     jsonfile.writeFile(FILE_PATH, data, () => {
//         simplegit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, makecommit.bind(this, --n));
//     });

// }

// makecommit(600);



import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';

const FILE_PATH = './data.json';
const REPO = simpleGit();

// Ensure the repository is initialized
const setupRepo = async () => {
    try {
        await REPO.init();
        console.log("✅ Git repository initialized (if not already)");
    } catch (err) {
        console.error("⚠️ Error initializing Git:", err);
    }
};

const getRandomDateBetween = (start, end) => {
    const startDate = moment(start);
    const endDate = moment(end);
    const randomDate = moment(startDate).add(Math.random() * (endDate - startDate), 'milliseconds');
    return randomDate.format();
};

const startDate = '2024-03-01';  // Adjust start date as needed
const endDate = '2025-03-01';  // One-year spread

const makeCommit = async (n) => {
    if (n === 0) {
        console.log("✅ All commits done! Pushing to GitHub...");
        await REPO.push();
        console.log("🚀 Pushed to GitHub!");
        return;
    }

    const DATE = getRandomDateBetween(startDate, endDate);
    const data = { date: DATE };

    console.log(`📅 Commit #${n}: ${DATE}`);

    jsonfile.writeFile(FILE_PATH, data, async () => {
        await REPO.add([FILE_PATH]);
        await REPO.commit(DATE, { '--date': DATE });
        makeCommit(n - 1);
    });
};

const start = async () => {
    await setupRepo();
    makeCommit(600);  // Adjust the number of commits if needed
};

start();
