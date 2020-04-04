
  const text = ['Jangan lupa cuci tangan','Di rumah aja','Jaga kesehatan anda','Stay safe & Stay Home'];
  const rand = Math.floor(Math.random() * 3) + 1;
  
    Snackbar.show({
      text: text[rand],
      pos: 'bottom-center',
      actionText: 'OK'
    });
