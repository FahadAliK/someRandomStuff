const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';



function getMaxLifesValues() {
  const enteredValue = parseInt(prompt('Please Enter a MAx Life:', '100'));
  if (isNaN(enteredValue) || enteredValue <= 0) {
    throw {
      message: "Invalid number.!!"
    };
  }
  return enteredValue;
} 
let chosenMaxLife = null;
try {
  chosenMaxLife = getMaxLifesValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('You entered somethig wrong, default value is 100.!');
}




// let chosenMaxLife = parseInt(prompt('Please Enter A MAX Life: ', '100'));
// if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
//   chosenMaxLife = 100;
// }

// let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];
let lastLogEntry;

adjustHealthBars(chosenMaxLife);

function WriteToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  };
  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: event,
        value: value,
        terger: 'MONSTER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
      };
      break;
    default:
      logEntry = {};
  }

  // if (event === LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     terger: 'MONSTER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: 'PLAYER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: 'PLAYER',
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // } else if (event === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth
  //   };
  // }

  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  WriteToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert('Saved.! By Bonus Life.');
    setPlayerHealth(initialPlayerHealth);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won.!');
    WriteToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER_WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
    // writeToLog(
    //   LOG_EVENT_GAME_OVER,
    //   'PLAYER_WON',
    //   currentMonsterHealth,
    //   currentPlayerHealth
    // )
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost.!');
    WriteToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER_WON',
      currentMonsterHealth,
      currentPlayerHealth
    );

    // writeToLog(
    //   LOG_EVENT_GAME_OVER,
    //   'MONSTER_WON',
    //   currentMonsterHealth,
    //   currentPlayerHealth
    // )
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw.!');
    WriteToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );

    // writeToLog(
    //   LOG_EVENT_GAME_OVER,
    //   'A DRAW',
    //   currentMonsterHealth,
    //   currentPlayerHealth
    // )
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(attackMode) {
  let maxDamage;
  let logEvent;
  if (attackMode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (attackMode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  // const maxDamage = attackMode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  // const logEvent = attackMode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  WriteToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

  // writeToLog(
  //   logEvent,
  //   damage,
  //   currentMonsterHealth,
  //   currentPlayerHealth
  // )
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("Can't heal more then max life.!!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  WriteToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  // writeToLog(
  //   LOG_EVENT_PLAYER_HEAL,
  //   healValue,
  //   currentMonsterHealth,
  //   currentPlayerHealth
  // )
  endRound();
}

function printLogHandler() {
  // for (let index = 0; index < battleLog.length; index++) {
  //   console.log(battleLog[index]);
  // }
  // console.log(battleLog);
  // using a for of loop

  let i = 0;
  for (const logEntry of battleLog) {
    if (!lastLogEntry && lastLogEntry !== 0 || lastLogEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        // console.log(key);
        // console.log(logEntry[key]);
        console.log(`${key} ==> ${logEntry[key]}`);
      }
      lastLogEntry = i;
      break;
    }
    i++;
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
