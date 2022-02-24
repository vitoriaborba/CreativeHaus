document.addEventListener(
  "DOMContentLoaded",
  () => {
    
    console.log("project2 JS imported successfully!");
    if ( localStorage.getItem('theme') === 'dark'){
      document.getElementById("body").classList.remove("light-mode");
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
      document.getElementById("body").classList.add("light-mode");
    }
  },
  false
);

// Nav Animation

const menu_btn = document.querySelector('.hamburger');
	const hamburger_menu = document.querySelector('.hamburger-nav');

	menu_btn.addEventListener('click', function () {
		menu_btn.classList.toggle('is-active');
		hamburger_menu.classList.toggle('is-active');
	});

  document.cookie = "light-mode";

  if(document.cookie){
  function handleChange(checkbox) {
    if(checkbox.checked == true){
         document.getElementById("body").classList.add("light-mode");
        localStorage.setItem("theme", "light");
    }else{
        document.getElementById("body").classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
   }
 } 
}
