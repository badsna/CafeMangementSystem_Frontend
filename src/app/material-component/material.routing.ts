import { Routes } from '@angular/router';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';


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
    },
    {
        path:'order',
        component:ManageOrderComponent,
        canActivate:[RouteGuardService],
        data:{
            // RouteGuardService ko method implements garya vayaraw expectRole naii hunu paryo            
            expectRole:['admin','user']
        }
    },
    {
        path:'bill',
        component:ViewBillComponent,
        canActivate:[RouteGuardService],
        data:{
            // RouteGuardService ko method implements garya vayaraw expectRole naii hunu paryo            
            expectRole:['admin','user']
        }
    }
];

