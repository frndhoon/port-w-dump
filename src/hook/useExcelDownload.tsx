'use client';

import React, { useState } from 'react';

import { downloadExcelWithLoading } from '@/app/t-container/_util/excel-utils';
import { VesselLoader } from '@/component/vessel-loader';

type UseExcelDownloadProps = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const useExcelDownload = ({
  onSuccess,
  onError,
}: UseExcelDownloadProps = {}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadExcel = async (
  data: (string | number)[][],
    filename: string,
    title: string
  ) => {
    try {
      await downloadExcelWithLoading(data, filename, title, setIsDownloading);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const LoadingOverlay = () => {
    return isDownloading ? <VesselLoader /> : null;
  };

  return {
    downloadExcel,
    isDownloading,
    LoadingOverlay,
  };
};
