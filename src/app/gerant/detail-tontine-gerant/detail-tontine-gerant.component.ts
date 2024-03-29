import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-tontine-gerant',
  templateUrl: './detail-tontine-gerant.component.html',
  styleUrls: ['./detail-tontine-gerant.component.css']
})
export class DetailTontineGerantComponent  implements OnInit{
  ngOnInit() {
    const menuToggle = document.getElementById("menu-toggle") as HTMLElement | null;

    // Attache un gestionnaire d'événements au clic de cet élément
    menuToggle?.addEventListener("click", (e: Event) => {
        // Empêche le comportement par défaut de l'événement de clic
        e.preventDefault();
    
        // Sélectionne l'élément avec l'ID "wrapper"
        const wrapper = document.getElementById("wrapper");
    
        // Alterne la classe "toggled" sur cet élément
        if (wrapper?.classList.contains("toggled")) {
            wrapper.classList.remove("toggled");
        } else {
            wrapper?.classList.add("toggled");
        }
    });
  }

}
