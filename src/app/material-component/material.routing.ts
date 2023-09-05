import { Routes } from '@angular/router';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';


export const MaterialRoutes: Routes = [
    {
        path:'category',
        component:ManageCategoryComponent,
        canActivate:[RouteGuardService],
        data:{
            // RouteGuardService ko method implements garya vayaraw expectRole naii hunu paryo            
            expectRole:['admin']
        }
    },
    {
        path:'product',
        component:ManageProductComponent,
        canActivate:[RouteGuardService],
        data:{
            // RouteGuardService ko method implements garya vayaraw expectRole naii hunu paryo            
            expectRole:['admin']
        }
    }
];

