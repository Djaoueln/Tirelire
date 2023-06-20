  // Déclaration d'un tableau pour stocker les tirelires
  let piggyBanks = [];

  // Fonction pour ajouter une nouvelle tirelire
  function addPiggyBank(name, budget) {
    const piggyBank = {
      name: name,
      budget: budget,
      balance: budget
    };
    piggyBanks.push(piggyBank);
    savePiggyBanks();
    renderPiggyBanks();
  }

// Fonction pour afficher toutes les tirelires
function renderPiggyBanks() {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    piggyBanks.forEach((piggyBank, index) => {
      const div = document.createElement('div');
      div.className = 'piggy-bank';
      div.draggable = true;
      div.innerHTML = `
        <h3>${piggyBank.name}</h3>
        <span class="budget-amount">[${piggyBank.budget.toFixed(2).replace('.', ',')} €]</span>
        <p>${piggyBank.balance.toFixed(2).replace('.', ',')} €</p>
      `;
      container.appendChild(div);
  
      // Ajouter l'index de la tirelire au format texte lors du démarrage du glisser-déposer
      div.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', index);
      });
    });
  }
  
  
  // Fonction pour formater un montant avec séparateur de milliers
  function formatAmount(amount) {
    return amount.toLocaleString();
  }
  
  // Fonction pour ajouter une dépense à une tirelire sélectionnée



// Déclaration de la variable amount en dehors de la fonction addExpense()
let amount;

// Fonction pour ajouter une dépense à une tirelire sélectionnée
function addExpense() {
  const selectedPiggyBankDiv = document.querySelector('.piggy-bank.selected');
  if (selectedPiggyBankDiv) {
    const piggyBankName = selectedPiggyBankDiv.querySelector('h3').textContent;
    const piggyBank = piggyBanks.find(piggyBank => piggyBank.name === piggyBankName);
    if (piggyBank) {
      amount = parseFloat(prompt(`Entrez une dépense pour la tirelire "${piggyBank.name}":`).replace(',', '.'));
      if (!isNaN(amount)) {
        piggyBank.balance -= amount;
        savePiggyBanks();
        renderPiggyBanks();
      }
    }
  }
}

// Fonction pour annuler l'action en cours
function cancelAction() {
  amount = undefined; // Réinitialisez la variable amount à undefined pour indiquer l'annulation
  // Réinitialisez d'autres variables ou effectuez les actions d'annulation nécessaires
  hideNumericKeyboard(); // Masquez le clavier numérique, si nécessaire
}



  

function showNumericKeyboard() {
    const numericKeyboard = document.createElement('div');
    numericKeyboard.className = 'numeric-keyboard';
  
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'keyboard-buttons';
  
    // Créez les boutons du clavier numérique de 0 à 9
    for (let i = 0; i <= 9; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => {
        const inputField = document.querySelector('.numeric-keyboard input');
        inputField.value += i;
      });
      buttonsContainer.appendChild(button);
    }
  
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'numeric-input';
  
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'OK';
    confirmButton.addEventListener('click', () => {
      const inputField = document.querySelector('.numeric-keyboard input');
      const amount = parseFloat(inputField.value.replace(',', '.'));
      if (!isNaN(amount)) {
        piggyBank.balance -= amount;
        savePiggyBanks();
        renderPiggyBanks();
      }
      document.body.removeChild(numericKeyboard);
    });
  
    numericKeyboard.appendChild(inputField);
    numericKeyboard.appendChild(buttonsContainer);
    numericKeyboard.appendChild(confirmButton);
  
    document.body.appendChild(numericKeyboard);
  }

  






  // Fonction pour supprimer une tirelire sélectionnée

function deletePiggyBank() {
const selectedPiggyBankDiv = document.querySelector('.piggy-bank.selected');
if (selectedPiggyBankDiv) {
  const piggyBankName = selectedPiggyBankDiv.querySelector('h3').textContent;
  const index = piggyBanks.findIndex(piggyBank => piggyBank.name === piggyBankName);
  if (index !== -1) {
    const confirmation = confirm(`Supprimer la tirelire "${piggyBankName}"?`);
    if (confirmation) {
      piggyBanks.splice(index, 1);
      savePiggyBanks();
      renderPiggyBanks();
    }
  }
}
}



  // Fonction pour sélectionner une tirelire
  function selectPiggyBank(piggyBankDiv) {
    deselectPiggyBanks();
    piggyBankDiv.classList.add('selected');
  }

  // Fonction pour désélectionner toutes les tirelires
  function deselectPiggyBanks() {
    const piggyBankDivs = document.querySelectorAll('.piggy-bank');
    piggyBankDivs.forEach(piggyBankDiv => {
      piggyBankDiv.classList.remove('selected');
    });
  }

  // Fonction pour ajouter le budget à toutes les tirelires

function addBudget() {
const confirmation = confirm("Alimenter tous les budgets?");
if (confirmation) {
  piggyBanks.forEach(piggyBank => {
    piggyBank.balance += piggyBank.budget;
  });
  savePiggyBanks();
  renderPiggyBanks();
}
}


// Fonction pour transférer des fonds d'une tirelire à une autre
function transferFunds() {
const sourcePiggyBankDiv = document.querySelector('.piggy-bank.selected');
if (sourcePiggyBankDiv) {
  const sourcePiggyBankName = sourcePiggyBankDiv.querySelector('h3').textContent;
  const sourcePiggyBank = piggyBanks.find(piggyBank => piggyBank.name === sourcePiggyBankName);
  if (sourcePiggyBank) {
    deselectPiggyBanks();
    const targetPiggyBankDivs = document.querySelectorAll('.piggy-bank:not(.selected)');
    targetPiggyBankDivs.forEach(targetPiggyBankDiv => {
      targetPiggyBankDiv.addEventListener('click', () => {
        const targetPiggyBankName = targetPiggyBankDiv.querySelector('h3').textContent;
        const targetPiggyBank = piggyBanks.find(piggyBank => piggyBank.name === targetPiggyBankName);
        if (targetPiggyBank) {
          const amount = parseFloat(prompt('Entrez montant du transfert:').replace(',', '.'));
          if (!isNaN(amount) && amount <= sourcePiggyBank.balance) {
            sourcePiggyBank.balance -= amount;
            targetPiggyBank.balance += amount;
            savePiggyBanks();
            renderPiggyBanks();
          } else {
            alert('Transfert invalide - Fond insuffisant.');
          }
        }
      });
    });
    alert('Sélectionnez une tirelire à créditer.');
  }
}
}


  // Fonction pour enregistrer les tirelires dans le stockage local
  function savePiggyBanks() {
    localStorage.setItem('piggyBanks', JSON.stringify(piggyBanks));
  }

  // Fonction pour charger les tirelires depuis le stockage local
  function loadPiggyBanks() {
    const savedPiggyBanks = localStorage.getItem('piggyBanks');
    if (savedPiggyBanks) {
      piggyBanks = JSON.parse(savedPiggyBanks);
      renderPiggyBanks();
    }
  }


// Fonction pour déplacer une tirelire vers une position spécifique
function movePiggyBank(sourceIndex, targetIndex) {
    const piggyBank = piggyBanks[sourceIndex];
    piggyBanks.splice(sourceIndex, 1);
    piggyBanks.splice(targetIndex, 0, piggyBank);
    savePiggyBanks();
    renderPiggyBanks();
  }
  const container = document.querySelector('.container');

container.addEventListener('dragstart', (event) => {
  event.target.classList.add('dragging');
});

container.addEventListener('dragend', (event) => {
  event.target.classList.remove('dragging');
});

container.addEventListener('dragover', (event) => {
  event.preventDefault();
});

container.addEventListener('dragenter', (event) => {
  if (event.target.classList.contains('piggy-bank')) {
    event.target.classList.add('dragover');
  }
});

container.addEventListener('dragleave', (event) => {
  if (event.target.classList.contains('piggy-bank')) {
    event.target.classList.remove('dragover');
  }
});

container.addEventListener('drop', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('piggy-bank')) {
    const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'));
    const targetIndex = piggyBanks.findIndex((piggyBank) => piggyBank.name === event.target.querySelector('h3').textContent);
    if (sourceIndex >= 0 && targetIndex >= 0 && sourceIndex !== targetIndex) {
      movePiggyBank(sourceIndex, targetIndex);
    }
  }
});




  function initialize() {
    loadPiggyBanks();
  
    const addBtn = document.querySelector('#add-btn');
    const expenseBtn = document.querySelector('#expense-btn');
    const deleteBtn = document.querySelector('#delete-btn');
    const addBudgetBtn = document.querySelector('#add-budget-btn');
    const transferBtn = document.querySelector('#transfer-btn');
  
    // Fonction pour ajouter la classe active
    function activateButton(button) {
      button.classList.add('active');
    }
  
    // Fonction pour retirer la classe active
    function deactivateButton(button) {
      button.classList.remove('active');
    }
  
    // Ajouter l'événement mousedown et mouseup à chaque bouton
    // addBtn.addEventListener('mousedown', () => activateButton(addBtn));
    // addBtn.addEventListener('mouseup', () => deactivateButton(addBtn));
  
    // expenseBtn.addEventListener('mousedown', () => activateButton(expenseBtn));
    // expenseBtn.addEventListener('mouseup', () => deactivateButton(expenseBtn));
  
    // deleteBtn.addEventListener('mousedown', () => activateButton(deleteBtn));
    // deleteBtn.addEventListener('mouseup', () => deactivateButton(deleteBtn));
  
    // addBudgetBtn.addEventListener('mousedown', () => activateButton(addBudgetBtn));
    // addBudgetBtn.addEventListener('mouseup', () => deactivateButton(addBudgetBtn));
  
    // transferBtn.addEventListener('mousedown', () => activateButton(transferBtn));
    // transferBtn.addEventListener('mouseup', () => deactivateButton(transferBtn));
  
    addBtn.addEventListener('click', () => {
        const name = prompt('Entrez le nom de la tirelire:');
        const budget = parseFloat(prompt('Entrez le budget mensuel:').replace(',', '.'));
        if (name && !isNaN(budget)) {
          addPiggyBank(name, budget);
        }
      });
  
    expenseBtn.addEventListener('click', addExpense);
  
    deleteBtn.addEventListener('click', deletePiggyBank);
  
    addBudgetBtn.addEventListener('click', addBudget);
  
    transferBtn.addEventListener('click', startTransfer);
  
    const container = document.querySelector('.container');
    container.addEventListener('click', (event) => {
      if (event.target === container || event.target.classList.contains('piggy-bank')) {
        deselectPiggyBanks();
      }
  
      if (event.target.classList.contains('piggy-bank')) {
        selectPiggyBank(event.target);
      }
    });
  
    // Variables pour le virement
    let sourcePiggyBankDiv = null;
    let targetPiggyBankDiv = null;
  
    function startTransfer(event) {
      if (event.target.classList.contains('piggy-bank')) {
        sourcePiggyBankDiv = event.target;
        sourcePiggyBankDiv.classList.add('selected');
      }
    }
  
    container.addEventListener('mouseup', (event) => {
      if (sourcePiggyBankDiv && event.target.classList.contains('piggy-bank')) {
        targetPiggyBankDiv = event.target;
  
        const sourcePiggyBankName = sourcePiggyBankDiv.querySelector('h3').textContent;
        const targetPiggyBankName = targetPiggyBankDiv.querySelector('h3').textContent;
  
        const sourcePiggyBank = piggyBanks.find(piggyBank => piggyBank.name === sourcePiggyBankName);
        const targetPiggyBank = piggyBanks.find(piggyBank => piggyBank.name === targetPiggyBankName);
  
        if (sourcePiggyBank && targetPiggyBank) {
          const amount = parseFloat(prompt('Entrez le montant du virement :').replace(',', '.'));
  
          if (!isNaN(amount) && amount <= sourcePiggyBank.balance) {
            sourcePiggyBank.balance -= amount;
            targetPiggyBank.balance += amount;
  
            savePiggyBanks();
            renderPiggyBanks();
          } else {
            alert('Virement invalide - Montant insuffisant.');
          }
        }
      }
  
      sourcePiggyBankDiv = null;
      targetPiggyBankDiv = null;
      deselectPiggyBanks();
    });

     // Renouvellement automatique des budgets
  let renewalDay = prompt('Entrez le jour de renouvellement des budgets (1-31) :');
  let renewalAmount = parseFloat(prompt('Entrez le montant de renouvellement :').replace(',', '.'));

  renewalDay = parseInt(renewalDay);
  renewalAmount = parseFloat(renewalAmount);

  if (isNaN(renewalDay) || isNaN(renewalAmount) || renewalDay < 1 || renewalDay > 31 || renewalAmount <= 0) {
    alert('Jour de renouvellement ou montant invalide.');
    return;
  }

  function renewBudgets() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    let renewalDate;

    if (currentDay > renewalDay) {
      renewalDate = new Date(currentDate.getFullYear(), currentMonth + 1, renewalDay, renewalTime.slice(0, 2), renewalTime.slice(3));
    } else {
      renewalDate = new Date(currentDate.getFullYear(), currentMonth, renewalDay, renewalTime.slice(0, 2), renewalTime.slice(3));
    }

    const timeUntilRenewal = renewalDate.getTime() - currentDate.getTime();

    setTimeout(() => {
      piggyBanks.forEach(piggyBank => {
        piggyBank.balance += renewalAmount;
      });

      savePiggyBanks();
      renderPiggyBanks();

      renewBudgets(); // Planifier le prochain renouvellement
    }, timeUntilRenewal);
  }

  renewBudgets(); // Lancer le premier renouvellement
  }
  

  initialize();
