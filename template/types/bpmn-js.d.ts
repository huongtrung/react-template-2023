declare module 'bpmn-js' {
 interface ImportXMLCallback {
   (err: any, warnings?: any[]): void;
 }

 interface BpmnJSOptions {
   container: HTMLElement | null;
 }

 class BpmnJS {
   constructor(options: BpmnJSOptions);
   importXML(xml: string, callback: ImportXMLCallback): void;
   destroy(): void;
 }

 export default BpmnJS;
}