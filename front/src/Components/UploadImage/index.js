import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

export default function Upload(props) {
	return (
		<FilePond
			name='image'
			files={props.file}
			allowMultiple={false}
			server='http://10.138.11.150:8080/api/upload'
			onupdatefiles={fileItems => {
				props.uploadFile(fileItems.map(fileItem => fileItem.file));
			}} />
	);
};