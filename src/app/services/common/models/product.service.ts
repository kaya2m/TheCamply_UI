import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/services/contracts/Create_Product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Products } from '../../contracts/List_Products';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from '../../contracts/List_Product_Image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClientService) { }

  create(product: Create_Product, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    this.httpClient.post({
      controller: 'products'
    }, product)
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: { key: string, value: string[] }[] = errorResponse.error;
          let message = '';

          _error.forEach((v) => {
            v.value.forEach((_v) => {
              message += _v + '\n';
            });
          });

          errorCallBack(message);
        }
      );
  }

  async read(page:number=0, size:number=5,successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{totalCount:number,products:List_Products[]}> 
  {
      const promiseData:Promise<{totalCount:number,products:List_Products[]}> 
      =  this.httpClient.get<{totalCount:number,products:List_Products[]}>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`
      }).toPromise();
  
      promiseData.then(d=>successCallBack())
      .catch((eroor:HttpErrorResponse)=>errorCallBack(eroor.message));
  
      return await promiseData;
  }

 async delete (id:string){
  const deleteObservable: Observable<any>=  this.httpClient.delete<any>({
      controller: 'products'
    },id);
    debugger;
    await firstValueFrom(deleteObservable);
    debugger;
  }

  async readImage(id:string, successCallBack?:()=>void):Promise<List_Product_Image[]>{
    const getObservable:Observable<List_Product_Image[]> = this.httpClient.get<List_Product_Image[]>({
      action:"GetProductImages",
      controller: 'products'
    },id)
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }
  

  async deleteImage(id:string,imageId:string, successCallBack?:()=>void){
   const deleteObservable = this.httpClient.delete({
      action:"DeleteProductImage",
      controller: 'products',
      queryString:`imageId=${imageId}`,
    },id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}
