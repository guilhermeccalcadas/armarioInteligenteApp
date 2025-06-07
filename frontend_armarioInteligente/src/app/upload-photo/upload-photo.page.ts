import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoupaService } from '../services/roupa.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.page.html',
  styleUrls: ['./upload-photo.page.scss'],
  standalone: false,
})
export class UploadPhotoPage implements OnInit {

  constructor(private fb: FormBuilder, private roupaService: RoupaService) {
    this.roupaForm = this.fb.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      cor: ['', Validators.required],
      tamanho: ['', Validators.required],
      marca: ['', Validators.required],
      dataUltimoUso: [''] // pode ser null
    });
  }

  ngOnInit() {
  }

    roupaForm: FormGroup;
  selectedFile: File | null = null;



  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

submitForm() {
  if (this.roupaForm.valid) {
    const formData = new FormData();
    formData.append('nome', this.roupaForm.value.nome);
    formData.append('categoria', this.roupaForm.value.categoria);
    formData.append('cor', this.roupaForm.value.cor);
    formData.append('tamanho', this.roupaForm.value.tamanho);
    formData.append('marca', this.roupaForm.value.marca);

    if (this.roupaForm.value.dataUltimoUso) {
      formData.append('dataUltimoUso', this.roupaForm.value.dataUltimoUso);
    }

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    // Chamar o serviço para enviar os dados
    this.roupaService.adicionarRoupa(formData).subscribe({
      next: (res) => {
        console.log('Roupa adicionada com sucesso:', res);
        // Aqui podes limpar o formulário ou mostrar uma mensagem ao utilizador
        this.roupaForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Erro ao adicionar roupa:', err);
      }
    });
  }
}

}
