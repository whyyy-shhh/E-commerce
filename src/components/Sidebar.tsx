import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleAlt,
  faClock,
  faTshirt,
  faShoePrints,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { useFilter } from './FilterContext';

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
    filter,
    setFilter,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>(['apple', 'watch', 'fashion', 'trend', 'shoes', 'shirt']);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword('');
    setFilter('all');
  };

  const handleApplyFilter = (value: string) => {
    setFilter(value);
    setDropdownOpen(false);
  };

  return (
    <Box className="sidebar">
      <Box className="sidebar-scroll">
        <Typography variant="h4" className="sidebar-title">
          SwiftShop
        </Typography>

        <TextField
          label="Search Product"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Min"
            variant="outlined"
            fullWidth
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}
          />
          <TextField
            label="Max"
            variant="outlined"
            fullWidth
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </Box>

        <FormControl component="fieldset" margin="normal">
          <FormLabel>Categories</FormLabel>
          <RadioGroup
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <FormControlLabel
                key={index}
                value={category}
                control={<Radio />}
                label={category.toUpperCase()}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ marginY: 2 }}>
          <Typography variant="h6">Keywords</Typography>
          {keywords.map((word, index) => (
            <Button
              key={index}
              fullWidth
              variant="outlined"
              onClick={() => setKeyword(word)}
              startIcon={getIcon(word)}
              sx={{ marginY: 0.5 }}
            >
              {word.toUpperCase()}
            </Button>
          ))}
        </Box>

        <Box sx={{ position: 'relative', marginBottom: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Apply Filters
          </Button>
          {dropdownOpen && (
            <Box
              sx={{
                position: 'absolute',
                top: '110%',
                width: '100%',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: 1,
                zIndex: 10,
              }}
            >
              {['cheap', 'expensive', 'popular'].map((f, i) => (
                <Button
                  key={i}
                  fullWidth
                  onClick={() => handleApplyFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Box className="sidebar-footer">
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};

const getIcon = (keyword: string) => {
  switch (keyword.toLowerCase()) {
    case 'apple':
      return <FontAwesomeIcon icon={faAppleAlt} />;
    case 'watch':
      return <FontAwesomeIcon icon={faClock} />;
    case 'fashion':
    case 'shirt':
    case 'clothing':
      return <FontAwesomeIcon icon={faTshirt} />;
    case 'shoes':
      return <FontAwesomeIcon icon={faShoePrints} />;
    default:
      return <FontAwesomeIcon icon={faTags} />;
  }
};

export default Sidebar;
