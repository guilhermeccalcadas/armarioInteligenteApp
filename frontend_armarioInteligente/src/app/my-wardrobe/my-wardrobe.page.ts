import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoupaService } from '../services/roupa.service';  // ajusta o caminho conforme necessário
import { Roupa } from '../interfaces/roupa';  // ajusta o caminho conforme necessário

@Component({
  selector: 'app-my-wardrobe',
  templateUrl: './my-wardrobe.page.html',
  styleUrls: ['./my-wardrobe.page.scss'],
  standalone: false
})
export class MyWardrobePage implements OnInit {

  roupas: Roupa[] = [];
  currentIndex = 0;

  constructor(private router: Router, private roupaService: RoupaService) { }

  ngOnInit() {
    this.loadRoupas();
  }

  ionViewWillEnter() {
    this.loadRoupas();
  }

  loadRoupas() {
    this.roupaService.getRoupas().subscribe({
      next: (data) => {
        this.roupas = data;
        this.currentIndex = 0;  // começa na primeira roupa
      },
      error: (err) => {
        console.error('Erro ao carregar roupas', err);
      }
    });
  }

  goToUploadPhoto() {
    this.router.navigate(['tabs/my-wardrobe/uploadNewPhoto']);
  }

  showPrevious() {
    if (this.roupas.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.roupas.length) % this.roupas.length;
    }
  }

  showNext() {
    if (this.roupas.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.roupas.length;
    }
  }

  get currentRoupa(): Roupa | null {
    if (this.roupas.length === 0) {
      return null;
    }
    return this.roupas[this.currentIndex];
  }

  deleteCurrentRoupa() {
    if (!this.currentRoupa?._id) return;

    if (confirm('Tens a certeza que queres apagar esta roupa?')) {
      this.roupaService.deleteRoupaById(this.currentRoupa._id).subscribe({
        next: () => {
          alert('Roupa apagada com sucesso!');
          this.loadRoupas();  // Atualiza a lista de roupas depois de apagar
        },
        error: (err) => {
          alert('Erro ao apagar roupa.');
          console.error(err);
        }
      });
    }
  }

}


