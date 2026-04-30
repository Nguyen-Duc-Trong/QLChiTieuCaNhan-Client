import { Card, CardContent, Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
  bgcolor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function SummaryCard({
  title,
  value,
  icon,
  color = 'primary.main',
  bgcolor = 'primary.light',
}: SummaryCardProps) {
  const iconSx: SxProps<Theme> = {
    width: 48,
    height: 48,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: bgcolor,
    color: color,
    '& .MuiSvgIcon-root': {
      fontSize: 24,
    },
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
          </Box>
          <Box sx={iconSx}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
