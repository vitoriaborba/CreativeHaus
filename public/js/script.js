document.addEventListener(
  "DOMContentLoaded",
  () => {
    
    console.log("project2 JS imported successfully!");
    if ( localStorage.getItem('theme') === 'light'){
      document.getElementById("body").classList.remove("dark-mode");
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
      document.getElementById("body").classList.add("dark-mode");
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

  document.cookie = "dark-mode";

  if(document.cookie){
  function handleChange(checkbox) {
    if(checkbox.checked == true){
         document.getElementById("body").classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    }else{
        document.getElementById("body").classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
   }
 } 
}
