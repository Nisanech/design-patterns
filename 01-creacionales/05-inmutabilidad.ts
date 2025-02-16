/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  readonly content: string;
  readonly cursorPisition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPisition: number,
    unsavedChanges: boolean,
  ) {
    this.content = content;
    this.cursorPisition = cursorPisition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith(
    { content, cursorPisition, unsavedChanges }: Partial<CodeEditorState>,
  ): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPisition ?? this.cursorPisition,
      unsavedChanges ?? this.unsavedChanges,
    );
  }

  displayState() {
    console.log("\n%cEstado del editor: ", COLORS.green);

    console.log(`
      Contenido: ${this.content}
      Cursor Pos: ${this.cursorPisition}
      Unsaved changes: ${this.unsavedChanges}
    `);
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.splice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;

      return this.history[this.currentIndex];
    }

    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState(
    "console.log('Hola mundo')",
    2,
    false,
  );

  history.save(editorState);

  console.log("%cEstado inicial", COLORS.blue);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('Hola mundo'); \nconsole.log('Nueva linea');",
    cursorPisition: 3,
    unsavedChanges: true,
  });
  history.save(editorState);

  console.log("\n%cDespues del primer cambio", COLORS.purple);
  editorState.displayState();

  console.log("\n%cDespues de mover el cursor", COLORS.violet);
  editorState = editorState.copyWith({ cursorPisition: 5 });
  history.save(editorState);
  editorState.displayState();
  
  console.log("\n%cDespues del undo", COLORS.pink);
  editorState = history.undo()!
  editorState.displayState()
  
  console.log("\n%cDespues del redo", COLORS.pink);
  editorState = history.redo()!
  editorState.displayState();
}

main();
