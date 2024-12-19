export const saveStateToLocalStorage = (state:any) => {
  let neimanStr = localStorage.getItem('neiman');

  let neiman;

  if(neimanStr) {
    neiman = JSON.parse(neimanStr);
  } else {
    neiman = {};
  }
  
  neiman = { ...neiman, ...state };
  localStorage.setItem('neiman', JSON.stringify(neiman));
};

