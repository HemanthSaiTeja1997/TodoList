import { Pipe, PipeTransform } from '@angular/core';
import { Itodo } from '../interface/itodo';

@Pipe({
  name: 'todoSearchFilter',
})
export class TodoSearchFilterPipe implements PipeTransform {
  transform(todos: Itodo[] | null | undefined, searchTerm: string): Itodo[] {
    if (!todos) {
      return [];
    }
    if (!searchTerm?.trim()) return todos;

    const term = searchTerm.toLowerCase().trim();

    return todos.filter(
      (todo) =>
        todo.description.toLowerCase().includes(term) ||
        todo.status.toLowerCase().includes(term)
    );
  }
}
