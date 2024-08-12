//fetch per ottenere il consiglio (advice-gererator) api:https://api.adviceslip.com/advice
async function getRandomAdvice() {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  //return data.slip.advice restituisce il messaggio
  //a me serve anche l'id
  return data;
}

export { getRandomAdvice };
