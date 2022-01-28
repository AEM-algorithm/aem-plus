export class FileHelpers {
  public static convertJSONArrayToCSV(jsonArray: any[]) {
    const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(jsonArray[0]);
    const csv = [
      header.join(','), // header row first
      ...jsonArray.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(',')
      ),
    ].join('\r\n');
    return csv;
  }
}
