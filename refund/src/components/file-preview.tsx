import FileIcon from "../assets/file.svg?react";
import Icon from "./icon";
import Text from "./text";

interface FilePreview {
  name?: string;
  link?: string;
}

export default function FilePreview({ name }: FilePreview) {
  return (
    <div className="flex gap-4">
      <Icon svg={FileIcon} />
      <Text>{name}</Text>
    </div>
  );
}
