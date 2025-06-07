import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'meuPerfil',
        loadChildren: () =>
          import('../meu-perfil/meu-perfil.module').then(m => m.MeuPerfilPageModule)
      },
      {
        path: 'myWardrobe',
        loadChildren: () =>
          import('../my-wardrobe/my-wardrobe.module').then(m => m.MyWardrobePageModule)
      },
      {
        path: 'my-wardrobe/uploadNewPhoto',
        loadChildren: () => import('../upload-photo/upload-photo.module').then(m => m.UploadPhotoPageModule)
      },
      {
        path: 'weather',
        loadChildren: () =>
          import('../weather/weather.module').then(m => m.WeatherPageModule)
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/myWardrobe',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
