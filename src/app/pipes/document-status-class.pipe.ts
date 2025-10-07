import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentStatusClass'
})
export class DocumentStatusClassPipe implements PipeTransform {

  transform(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Published': 'status-published',
      'Draft': 'status-draft',
      'Archived': 'status-archived'
    };
    return statusClasses[status] || 'status-default';
  }

}
