import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i}from"./assets/vendor-BbbuE1sJ.js";document.querySelector(".form").addEventListener("submit",function(t){t.preventDefault();const s=Number(t.target.elements.delay.value),o=t.target.elements.state.value;new Promise((e,m)=>{setTimeout(()=>{o==="fulfilled"?e(s):m(s)},s)}).then(e=>{i.success({message:`Fulfilled promise in ${e}ms`,position:"topRight",timeout:3e3})}).catch(e=>{i.error({message:`Rejected promise in ${e}ms`,position:"topRight",timeout:3e3})})});
//# sourceMappingURL=2-snackbar.js.map
