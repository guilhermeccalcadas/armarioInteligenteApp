import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roupa } from '../interfaces/roupa';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoupaService {

  private apiUrl = 'http://192.168.1.70:3000/roupa'; // muda isto se o teu backend estiver noutro local
  private BASE_URL = 'http://192.168.1.70:3000';
  constructor(private http: HttpClient) { }

  adicionarRoupa(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

  getRoupas(): Observable<Roupa[]> {
    return this.http.get<Roupa[]>(this.apiUrl).pipe(
      map(roupas => roupas.map(r => ({
        ...r,
        fotoUrl: r.fotoUrl ? this.BASE_URL + r.fotoUrl : ''
      })))
    );
  }

  deleteRoupaById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/by-id/${id}`);
  }



}
