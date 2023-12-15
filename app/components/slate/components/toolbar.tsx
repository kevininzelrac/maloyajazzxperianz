import BlockButton from "./blocks";
import { ToggleLink } from "./links";
import MarkButton from "./marks";
import TextAlign from "./textAlign";
import AddVoid from "./voids";
import { UndoButton, RedoButton } from "./history";

export default function Toolbar() {
  return (
    <nav className="toolbar">
      <UndoButton />
      <RedoButton />

      <MarkButton type="bold" />
      <MarkButton type="italic" />
      <MarkButton type="underline" />
      <MarkButton type="code" />

      <BlockButton type="h2" />
      <BlockButton type="h3" />
      <BlockButton type="h4" />

      <BlockButton type="paragraph" />
      <BlockButton type="blockquote" />
      <BlockButton type="ol" />
      <BlockButton type="ul" />

      <TextAlign textAlign="left" />
      <TextAlign textAlign="center" />
      <TextAlign textAlign="right" />
      <TextAlign textAlign="justify" />

      <ToggleLink />
      <AddVoid type="image" />
      <AddVoid type="youtube" />
    </nav>
  );
}
