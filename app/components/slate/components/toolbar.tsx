import { UndoButton, RedoButton } from "./history";
import { ToggleLink } from "./links";
import ColorPicker from "./colorPicker";
import TextAlign from "./textAlign";
import BlockButton from "./blocks";
import MarkButton from "./marks";
import AddVoid from "./voids";
import RemoveNode from "./removeNode";

export default function Toolbar() {
  return (
    <nav className="toolbar">
      <UndoButton />
      <RedoButton />

      <RemoveNode />

      <ColorPicker />

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
      <AddVoid type="spotify" />
    </nav>
  );
}
