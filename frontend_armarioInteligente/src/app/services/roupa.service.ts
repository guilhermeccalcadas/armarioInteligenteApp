import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoupaService {

  private apiUrl = 'http://192.168.1.70:3000/roupa'; // muda isto se o teu backend estiver noutro local

  constructor(private http: HttpClient) { }

  adicionarRoupa(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

}
