export interface dateTypeVal {
  startDError?: string;
  endDError?: string;
}

export interface neosdateType {
  start_date: string | undefined;
  end_date: string | undefined;
}

export interface neosType {
  id: string;
  date: string;
  name: string;
  colorStatus: string;
  kilometers: string;
}

export interface axiType {
  x_axis?: [];
  y_axis?: [];
}
