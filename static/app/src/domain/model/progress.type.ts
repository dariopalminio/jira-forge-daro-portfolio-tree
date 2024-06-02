//const [progress, setProgress] = useState<number>(0);
//const [progressTitle, setProgressTitle] = useState<string>(t('Loading...'));

export type ProgressType = {
    percentage: number;
    title: string;
};

export const progressEmpty: ProgressType = {
    percentage: 0,
    title: ''
};

  