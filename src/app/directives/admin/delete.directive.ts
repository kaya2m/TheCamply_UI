import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element : ElementRef,
    private _renderer : Renderer2,
    private productService : ProductService
    ) { 

      const img = _renderer.createElement('img');
      img.setAttribute('src','../../../../../assets/delete.png');
      img.setAttribute("style","width:20px; height:20px; cursor:pointer; margin-left:10px; margin-top:5px;");
      _renderer.appendChild(element.nativeElement,img);

    }

    @Input() id:string;
    @Output() callback: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('click')
   async onClick(){
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.productService.delete(this.id);
      $(td.parentElement).fadeOut(500,()=>{
        this.callback.emit();
      });
      };
    }
